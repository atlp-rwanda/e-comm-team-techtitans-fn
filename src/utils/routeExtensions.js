const userId = JSON.parse(localStorage.getItem('userId'));
export const resetPasswordPath = `/auth/reset-password/${userId}`;
