import { defineArrayMember, defineField, defineType } from 'sanity'

export const cohortPageSchema = defineType({
  name: 'cohortPage',
  title: 'Cohort Page',
  type: 'document',
  fields: [
    defineField({
      name: 'internGallery',
      title: 'Intern workplace gallery',
      description: 'The 5-slot collage — slot controls grid position (0 = large left, 1 = mid top, 2 = mid bottom, 3 = large right, 4 = far right).',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'galleryItem',
          fields: [
            defineField({
              name: 'type',
              title: 'Type',
              type: 'string',
              options: { list: ['image', 'video'] },
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'slot',
              title: 'Grid slot (0–4)',
              type: 'number',
              validation: (R) => R.required().min(0).max(4),
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.type !== 'image',
            }),
            defineField({
              name: 'video',
              title: 'Video file',
              type: 'file',
              options: { accept: 'video/*' },
              hidden: ({ parent }) => parent?.type !== 'video',
            }),
            defineField({
              name: 'poster',
              title: 'Video poster image',
              type: 'image',
              hidden: ({ parent }) => parent?.type !== 'video',
            }),
          ],
          preview: { select: { title: 'type', subtitle: 'slot', media: 'image' } },
        }),
      ],
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'speaker',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'name', media: 'photo' } },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Cohort Page' }
    },
  },
})
