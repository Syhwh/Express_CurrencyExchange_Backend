module.exports = {
  getDataForm(userInfo) {
    return {
      userEmail: userInfo.userEmail,
      userPassword: userInfo.userPassword,
      termsAndConditions: userInfo.termsAndConditions
    };
  }
};
