import { defineArrayMember, defineField, defineType } from 'sanity'

export const homePageSchema = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'pillars',
      title: 'Pillars ("what we do")',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pillar',
          fields: [
            defineField({ name: 'n', title: 'Number (e.g. 01)', type: 'string' }),
            defineField({ name: 't', title: 'Title', type: 'string' }),
            defineField({ name: 'b', title: 'Body', type: 'text', rows: 2 }),
          ],
          preview: { select: { title: 't', subtitle: 'n' } },
        }),
      ],
    }),
    defineField({
      name: 'gramStrip',
      title: 'From the gram — image strip',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
    }),
    defineField({
      name: 'gallery',
      title: 'Community gallery (lightbox)',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'galleryPhoto',
          fields: [
            defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
          preview: { select: { title: 'caption', media: 'photo' } },
        }),
      ],
    }),
    defineField({
      name: 'promoPhoto',
      title: 'Promo section photo',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Home Page' }
    },
  },
})
