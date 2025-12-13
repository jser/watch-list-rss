import * as path from 'node:path';
import * as url from 'node:url';
import constants from '../common/constants.js';
import { FeedCrawler } from '../feed/feed-crawler.js';
import { FeedGenerator } from '../feed/feed-generator.js';
import { FeedStorer } from '../feed/feed-storer.js';
import { FeedValidator } from '../feed/feed-validator.js';
import { logger } from '../feed/logger.js';
import { fetchFeedInfoList } from '../resources/feed-info-list.js';

const dirName = url.fileURLToPath(new URL('.', import.meta.url));

const STORE_FEEDS_DIR_PATH = path.join(dirName, '../site/feeds');
const STORE_BLOG_FEEDS_DIR_PATH = path.join(dirName, '../site/blog-feeds');

const feedCrawler = new FeedCrawler();
const feedGenerator = new FeedGenerator();
const feedValidator = new FeedValidator();
const feedStorer = new FeedStorer();

(async () => {
  // JSer.infoのwatch-listからフィード情報を取得
  const feedInfoList = await fetchFeedInfoList();

  // フィード取得
  const crawlFeedsResult = await feedCrawler.crawlFeeds(
    feedInfoList,
    constants.feedFetchConcurrency,
    constants.feedOgFetchConcurrency,
    new Date(Date.now() - constants.aggregateFeedDurationInHours * 60 * 60 * 1000),
  );

  // まとめフィード作成
  const ogObjectMap = new Map([...crawlFeedsResult.feedItemOgObjectMap, ...crawlFeedsResult.feedBlogOgObjectMap]);
  const generateFeedsResult = feedGenerator.generateFeeds(
    crawlFeedsResult.feedItems,
    ogObjectMap,
    crawlFeedsResult.feedItemHatenaCountMap,
    constants.maxFeedDescriptionLength,
    constants.maxFeedContentLength,
  );

  // ファイル出力
  try {
    await feedStorer.storeFeeds(
      generateFeedsResult.feedDistributionSet,
      STORE_FEEDS_DIR_PATH,
      crawlFeedsResult.feeds,
      ogObjectMap,
      crawlFeedsResult.feedItemHatenaCountMap,
      STORE_BLOG_FEEDS_DIR_PATH,
    );
  } catch (e) {
    const error = new Error('Failed to store feeds', {
      cause: e,
    });
    console.error(error);
    throw error;
  }

  // 最後にまとめフィードのバリデーション
  try {
    logger.info('フィードのバリデーション開始');

    await feedValidator.assertFeed(generateFeedsResult.aggregatedFeed);
    await feedValidator.assertXmlFeed('atom', generateFeedsResult.feedDistributionSet.atom);
    await feedValidator.assertXmlFeed('rss', generateFeedsResult.feedDistributionSet.rss);

    logger.info('フィードのバリデーション完了');
  } catch (e) {
    const error = new Error('Failed to validate feed', {
      cause: e,
    });
    console.error(error);
    throw error;
  }
})();
