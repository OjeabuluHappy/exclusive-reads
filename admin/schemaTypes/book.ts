export default {
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    { name: 'title', title: 'Book Title', type: 'string' },
    { name: 'cover', title: 'Book Cover', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Short Description', type: 'text' },
    { name: 'price', title: 'Price (in Naira)', type: 'number' },
    { name: 'buyLink', title: 'Paystack/Purchase Link', type: 'url' },
  ],
}