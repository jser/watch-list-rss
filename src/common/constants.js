// @ts-check
const siteUrlStem = 'https://jser.info/watch-list-rss';
const siteUrl = `${siteUrlStem}/`;

module.exports = {
  // サイト設定
  siteUrl: `${siteUrl}`,
  siteUrlStem: siteUrlStem,
  siteTitle: 'JSer.info Watch List RSS',
  siteDescription:
    'JSer.infoの情報源となるサイトのRSSフィードをまとめたサイトです。JavaScriptの情報源を集めることを目的としています。',

  // フィード設定
  feedTitle: 'JSer.info Watch List',
  feedDescription: 'JSer.infoの情報源となるサイトをまとめたRSSフィード',
  feedLanguage: 'ja',
  feedCopyright: 'jser/watch-list-rss',
  feedGenerator: 'jser/watch-list-rss',
  feedUrls: {
    atom: `${siteUrl}feeds/atom.xml`,
    rss: `${siteUrl}feeds/rss.xml`,
    json: `${siteUrl}feeds/feed.json`,
  },

  // GitHub
  author: 'jser',
  gitHubUserUrl: 'https://github.com/jser/',
  gitHubRepositoryUrl: 'https://github.com/jser/watch-list-rss/',

  // Google Analytics系。フォークして使う際は値を空にするか書き換えてください
  googleSiteVerification: '',
  globalSiteTagKey: 'G-Q66PHF829Y',
  // フィードの取得などに使う UserAgent
  requestUserAgent: 'facebookexternalhit/1.1; jser/watch-list-rss',

  // サイトの追加方法のリンク
  howToAddSiteLink: undefined,
};
