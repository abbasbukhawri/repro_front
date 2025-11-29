import { toast } from 'sonner';

/**
 * Toast notification helpers for the CRM system
 * All toasts appear in the top-right corner with a 4-second duration
 */

// Success Toasts
export const showSuccessToast = (title: string, description?: string) => {
  toast.success(title, {
    description: description,
  });
};

// Error Toasts
export const showErrorToast = (title: string, description?: string) => {
  toast.error(title, {
    description: description,
  });
};

// Warning Toasts
export const showWarningToast = (title: string, description?: string) => {
  toast.warning(title, {
    description: description,
  });
};

// Info Toasts
export const showInfoToast = (title: string, description?: string) => {
  toast.info(title, {
    description: description,
  });
};

// Loading Toast (with promise)
export const showLoadingToast = async (
  promise: Promise<any>,
  messages: {
    loading: string;
    success: string;
    error: string;
  }
) => {
  return toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
  });
};

// Common CRM Actions
export const ToastMessages = {
  // Lead Actions
  leadCreated: () => showSuccessToast('Lead Created!', 'New lead has been added to the system'),
  leadUpdated: () => showSuccessToast('Lead Updated!', 'Lead information has been saved'),
  leadDeleted: () => showSuccessToast('Lead Deleted!', 'Lead has been removed from the system'),
  leadAssigned: (agentName: string) => showSuccessToast('Lead Assigned!', `Lead assigned to ${agentName}`),

  // Property Actions
  propertyCreated: () => showSuccessToast('Property Created!', 'New property has been added to the listings'),
  propertyUpdated: () => showSuccessToast('Property Updated!', 'Property details have been saved'),
  propertyDeleted: () => showSuccessToast('Property Deleted!', 'Property has been removed'),

  // Viewing Actions
  viewingScheduled: () => showSuccessToast('Viewing Scheduled!', 'Property viewing has been scheduled'),
  viewingRescheduled: (newDate: string, newTime: string) => 
    showSuccessToast('Viewing Rescheduled!', `Viewing moved to ${newDate} at ${newTime}`),
  viewingCompleted: () => showSuccessToast('Viewing Completed!', 'Viewing marked as done'),
  viewingCancelled: () => showWarningToast('Viewing Cancelled', 'Viewing has been cancelled'),

  // Deal Actions
  dealCreated: () => showSuccessToast('Deal Created!', 'New deal has been added to the pipeline'),
  dealWon: (amount: string) => showSuccessToast('Deal Won! 🎉', `Congratulations! Deal closed at ${amount}`),
  dealLost: () => showWarningToast('Deal Lost', 'Deal has been marked as lost'),
  dealStageChanged: (stage: string) => showSuccessToast('Stage Updated', `Deal moved to ${stage}`),

  // Task Actions
  taskCreated: () => showSuccessToast('Task Created!', 'New task has been added'),
  taskCompleted: () => showSuccessToast('Task Completed!', 'Task marked as done'),
  taskDeleted: () => showSuccessToast('Task Deleted!', 'Task has been removed'),

  // User Actions
  userCreated: () => showSuccessToast('User Created!', 'New user has been added to the system'),
  userUpdated: () => showSuccessToast('User Updated!', 'User information has been saved'),
  userDeleted: () => showSuccessToast('User Deleted!', 'User has been removed'),

  // Team Actions
  teamCreated: () => showSuccessToast('Team Created!', 'New team has been created'),
  teamUpdated: () => showSuccessToast('Team Updated!', 'Team information has been saved'),
  memberAdded: (name: string) => showSuccessToast('Member Added!', `${name} has been added to the team`),

  // Call Actions
  callLogged: () => showSuccessToast('Call Logged!', 'Call details have been recorded'),
  callScheduled: () => showSuccessToast('Call Scheduled!', 'Call reminder has been set'),

  // Follow-up Actions
  followUpCreated: () => showSuccessToast('Follow-up Created!', 'Follow-up reminder has been set'),
  followUpCompleted: () => showSuccessToast('Follow-up Completed!', 'Follow-up marked as done'),

  // Document Actions
  documentUploaded: () => showSuccessToast('Document Uploaded!', 'Document has been saved'),
  documentDeleted: () => showSuccessToast('Document Deleted!', 'Document has been removed'),

  // Settings Actions
  settingsSaved: () => showSuccessToast('Settings Saved!', 'Your preferences have been updated'),
  
  // Error Messages
  genericError: () => showErrorToast('Error Occurred', 'Something went wrong. Please try again'),
  networkError: () => showErrorToast('Network Error', 'Unable to connect. Check your internet connection'),
  validationError: (message: string) => showErrorToast('Validation Error', message),
  
  // Warning Messages
  unsavedChanges: () => showWarningToast('Unsaved Changes', 'You have unsaved changes'),
  permissionDenied: () => showWarningToast('Permission Denied', 'You do not have permission to perform this action'),
};
