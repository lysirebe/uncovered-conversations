import { defineArrayMember, defineField, defineType } from 'sanity'

export const internshipPageSchema = defineType({
  name: 'internshipPage',
  title: 'Internship Page',
  type: 'document',
  fields: [
    defineField({
      name: 'steps',
      title: 'Programme steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'step',
          fields: [
            defineField({ name: 'n', title: 'Step number', type: 'number' }),
            defineField({ name: 't', title: 'Title', type: 'string' }),
            defineField({ name: 'lead', title: 'Lead line', type: 'string' }),
            defineField({
              name: 'points',
              title: 'Bullet points',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
          ],
          preview: { select: { title: 't', subtitle: 'n' } },
        }),
      ],
    }),
    defineField({
      name: 'spotlight',
      title: 'Intern spotlights',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'spotlightIntern',
          fields: [
            defineField({ name: 'name', title: 'Full caption (e.g. "Name — Role at Org")', type: 'string' }),
            defineField({ name: 'short', title: 'Short name', type: 'string' }),
            defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'hasVideo', title: 'Has video testimonial?', type: 'boolean', initialValue: false }),
            defineField({
              name: 'video',
              title: 'Video testimonial file',
              type: 'file',
              options: { accept: 'video/*' },
              hidden: ({ parent }) => !parent?.hasVideo,
            }),
          ],
          preview: { select: { title: 'short', media: 'photo' } },
        }),
      ],
    }),
    defineField({
      name: 'partners',
      title: 'Partner organisations',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'partner',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'logo', title: 'Logo', type: 'image' }),
          ],
          preview: { select: { title: 'name', media: 'logo' } },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Internship Page' }
    },
  },
})
