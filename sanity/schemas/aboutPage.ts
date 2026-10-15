import { defineArrayMember, defineField, defineType } from 'sanity'

export const aboutPageSchema = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'milestones',
      title: 'Timeline milestones',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'milestone',
          fields: [
            defineField({ name: 'year', title: 'Year / date label (e.g. 2022 · FEB)', type: 'string' }),
            defineField({ name: 'label', title: 'Small label above the title', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
          ],
          preview: { select: { title: 'title', subtitle: 'year', media: 'image' } },
        }),
      ],
    }),
    defineField({
      name: 'values',
      title: 'Values / pillars',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'value',
          fields: [
            defineField({ name: 't', title: 'Title', type: 'string' }),
            defineField({ name: 'b', title: 'Body', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 't' } },
        }),
      ],
    }),
    defineField({
      name: 'team',
      title: 'Team members',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'teamMember',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({ name: 'role', title: 'Role', type: 'string' }),
            defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 5 }),
          ],
          preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
        }),
      ],
    }),
    defineField({
      name: 'founder',
      title: 'Founder',
      type: 'object',
      fields: [
        defineField({ name: 'name', title: 'Name', type: 'string' }),
        defineField({ name: 'role', title: 'Role', type: 'string' }),
        defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'quote', title: 'Pull quote', type: 'text', rows: 3 }),
        defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 5 }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' }
    },
  },
})
