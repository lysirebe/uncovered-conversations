import { defineArrayMember, defineField, defineType } from 'sanity'

export const partnershipsPageSchema = defineType({
  name: 'partnershipsPage',
  title: 'Partnerships Page',
  type: 'document',
  fields: [
    defineField({
      name: 'why',
      title: 'Why host cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'whyItem',
          fields: [
            defineField({ name: 'n', title: 'Number (e.g. 01)', type: 'string' }),
            defineField({ name: 't', title: 'Title', type: 'string' }),
            defineField({ name: 'b', title: 'Body', type: 'text', rows: 2 }),
            defineField({ name: 'feature', title: 'Featured (large card)?', type: 'boolean', initialValue: false }),
          ],
          preview: { select: { title: 't', subtitle: 'n' } },
        }),
      ],
    }),
    defineField({
      name: 'options',
      title: 'Partnership options',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'option',
          fields: [
            defineField({ name: 'num', title: 'Number (e.g. 01)', type: 'string' }),
            defineField({ name: 't', title: 'Title', type: 'string' }),
            defineField({ name: 'sub', title: 'Subtitle', type: 'string' }),
            defineField({
              name: 'points',
              title: 'Bullet points',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
            defineField({ name: 'commit', title: 'Commitment line', type: 'string' }),
            defineField({ name: 'cta', title: 'CTA button label', type: 'string' }),
            defineField({ name: 'mailto', title: 'CTA link (mailto: or https:// URL)', type: 'string' }),
          ],
          preview: { select: { title: 't', subtitle: 'num' } },
        }),
      ],
    }),
    defineField({
      name: 'founders',
      title: 'Founder headshots',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'founderHeadshot',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'name', media: 'photo' } },
        }),
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'testimonial',
          fields: [
            defineField({ name: 'pull', title: 'Pull quote', type: 'text', rows: 3 }),
            defineField({ name: 'body', title: 'Body (optional, extra detail)', type: 'text', rows: 3 }),
            defineField({
              name: 'bodyHtml',
              title: 'Body as raw HTML (optional — only if specific words need bolding)',
              type: 'text',
              rows: 3,
            }),
            defineField({ name: 'company', title: 'Company name', type: 'string' }),
            defineField({ name: 'logo', title: 'Company logo', type: 'image' }),
            defineField({ name: 'feature', title: 'Featured (large card)?', type: 'boolean', initialValue: false }),
          ],
          preview: { select: { title: 'company', subtitle: 'pull', media: 'logo' } },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Partnerships Page' }
    },
  },
})
