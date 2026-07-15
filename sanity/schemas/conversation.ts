import { defineField, defineType } from 'sanity'

export const conversationSchema = defineType({
  name: 'conversation',
  title: 'Conversation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'episode',
      title: 'Episode',
      type: 'string',
      description: 'e.g. EP.025',
    }),
    defineField({
      name: 'season',
      title: 'Season',
      type: 'number',
    }),
    defineField({
      name: 'author',
      title: 'Guest / Author',
      type: 'string',
    }),
    defineField({
      name: 'publishedDate',
      title: 'Published Date',
      type: 'datetime',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'episode', media: 'coverImage' },
  },
})
