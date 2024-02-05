import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'dashboard',
    title: 'Home',
    type: 'item',
    icon: 'home',
    url: 'dashboard'
  },
 

   {
    id: 'joblisting',
    title: 'Job Listing',
    type: 'item',
    icon: 'list',
    url: 'careers/joblisting'
  },

    
  {
    id: 'jobopening ',
    title: 'Add Job Opening',
    type: 'item',
    icon: 'briefcase',
    url: 'careers/add-job-opening'
  },
   {
    id: 'jobdraft ',
    title: 'Job Draft',
    type: 'item',
    icon: 'edit',
    url: 'careers/job-draft'
  },



  {
    id: 'addcandidate ',
    title: 'Add Candidate',
    type: 'item',
    icon: 'user-plus',
    url: 'careers/add-candidate'
  },

   {
    id: 'addquestion ',
    title: 'Add New Question',
    type: 'item',
    icon: 'plus',
    url: 'careers/add-new-question'
  },

  {
    id: 'jobpublish ',
    title: 'Publish Job',
    type: 'item',
    icon: 'file-text',
    url: 'careers/job-publish'
  },
  

   {
    id: 'tenant-list',
    title: 'Settings',
    type: 'collapsible',
    // role: ['Admin'], //? To hide collapsible based on user role
    icon: 'settings',
    
    children: [
      {
        id: 'tenant-list',
        title: 'Tenant List',
        type: 'item',
        icon: 'chevron-right',
        url: 'setup/tenant-list'
      },
      {
        id: 'company-list',
        title: 'Company List',
        type: 'item',
        icon: 'chevron-right',
        url: 'setup/company-list'
      },
      {
        id: 'department-list',
        title: 'Department List',
        type: 'item',
        icon: 'chevron-right',
        url: 'setup/department-list'
      },

      {
        id: 'roles-list',
        title: 'Roles List',
        type: 'item',
        icon: 'chevron-right',
        url: 'setup/roles-list'
      },

      
   
    ]
  },
  {
    id: 'user-management',
    title: 'User Management',
    type: 'item',
    icon: 'user',
    url: 'user-management'
  },

   {
    id: 'view-candidates',
    title: 'Candidates',
    type: 'collapsible',
    // role: ['Admin'], //? To hide collapsible based on user role
    icon: 'users',
    
    children: [
      {
        id: 'candidate-pool',
        title: 'Candidate Pool',
        type: 'item',
        icon: 'chevron-right',
        url: 'view-candidates/candidate-pool'
      },

        {
        id: 'candidate-profile',
        title: 'Profile',
        type: 'item',
        icon: 'chevron-right',
        url: 'view-candidates/profile/:id'
      },

      {
        id: 'candidate-evaluation',
        title: 'Candidate Evaluation',
        type: 'item',
        icon: 'chevron-right',
        url: 'view-candidates/candidate-evaluation'
      },
      
    ]
  },

  




]
