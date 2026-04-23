import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: import.meta.env.PROD
    ? { kind: 'github', repo: 'willjacksonuk/wishlist.willjackson.uk' }
    : { kind: 'local' },
  collections: {
    wishlist: collection({
      label: 'Wishlist Items',
      slugField: 'title',
      path: 'src/content/wishlist/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        brand: fields.text({ label: 'Brand' }),
        description: fields.text({ label: 'Description', multiline: true }),
        url: fields.url({ label: 'Product URL' }),
        price: fields.text({ label: 'Price (e.g. £25.00)' }),
        code: fields.text({ label: 'Discount Code' }),
        priority: fields.select({
          label: 'Priority',
          options: [
            { label: 'High', value: 'high' },
            { label: 'Medium', value: 'medium' },
            { label: 'Low', value: 'low' },
          ],
          defaultValue: 'medium',
        }),
      },
    }),
  },
  singletons: {
    meta: singleton({
      label: 'Site Settings',
      path: 'src/content/meta',
      format: { data: 'json' },
      schema: {
        title: fields.text({ label: 'Page Title' }),
        subtitle: fields.text({ label: 'Subtitle' }),
      },
    }),
  },
});
