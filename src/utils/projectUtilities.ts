/**
 * Main exports for project utilities - only used functions
 */

// Core project functions
export { 
  getAllProjectsSorted,
  getProjectById, 
  filterProjects,
  getFilterableRoles,
  getFilterableTechs,
  getProjectNavigation
} from './projectUtils'

// Validation functions
export { 
  isValidProjectId
} from './validationUtils'

// Formatting functions
export { 
  generateImageAlt 
} from './formattingUtils'

// Routing functions
export { 
  shouldAutoScrollToProjects 
} from './routingUtils'