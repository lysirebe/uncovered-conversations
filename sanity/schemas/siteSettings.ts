import { defineField, defineType } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'applyUrl',
      title: 'Internship apply form URL',
      type: 'url',
    }),
    defineField({
      name: 'partnerFormUrl',
      title: 'Partner form URL',
      type: 'url',
    }),
    defineField({
      name: 'volunteerUrl',
      title: 'Volunteer form URL',
      type: 'url',
    }),
    defineField({
      name: 'bookACallUrl',
      title: 'Book-a-call link',
      type: 'url',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      description: 'Just the address, e.g. admin@uncoveredconversations.com — no "mailto:" prefix.',
      type: 'string',
      validation: (R) => R.email(),
    }),
    defineField({
      name: 'founderOppsFormUrl',
      title: 'Founder/host opportunities form URL',
      type: 'url',
    }),
    defineField({
      name: 'seekerOppsFormUrl',
      title: 'Opportunity-seeker form URL',
      type: 'url',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
