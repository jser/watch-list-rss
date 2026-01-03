export default async () => {
  const feedDataModule = await import('../feeds/feed.json');
  const feedData = feedDataModule.default;

  if (!feedData.items || feedData.items.length === 0) {
    return new Date().toISOString();
  }

  return new Date(feedData.items[0].date_published).toISOString();
};
