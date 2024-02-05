import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'home',
    url: 'home'
  },
  {
    id: 'sample',
    title: 'Sample',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'file',
    url: 'sample'
  },
  {
    id: 'Career',
    title: 'Careers',
    type: 'item',
    icon: 'briefcase',
    url: 'careers'
  },
  {
    id: 'jobListing',
    title: 'Job Listing',
    type: 'item',
    icon: 'file-text',
    url: 'careers/joblisting'
  }



]
