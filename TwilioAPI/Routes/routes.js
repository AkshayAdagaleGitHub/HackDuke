'use strict';
module.exports = function(app) {
  var TwilioHandlers = require('../controllers/TwilioController.js');
  var WorkRequestHandlers = require('../controllers/WorkRequestController.js');
  // var PatientHandlers = require('../controllers/PatientController.js');

  app.route('/sms')
    .post(TwilioHandlers.sms);

  app.route('/register_workrequest_mobile')
    .post(WorkRequestHandlers.register_workrequest_mobile);

  // app.route('/register_workrequest_fb')
  //   .post(WorkRequestHandlers.register_workrequest_fb);

//   app.route('/create_admin')
//       .post(AdminHandlers.create_admin);
//
//   app.route('/admin_login')
//       .post(AdminHandlers.admin_login);
//
//   app.route('/register_patient')
//       .post(PatientHandlers.register_patient);
//
//   app.route('/patient_login')
//       .post(PatientHandlers.patient_login);
//
//   app.route('/all_patient_data')
//       .post(PatientHandlers.all_patient_data);
//
//   app.route('/all_survey_data')
//       .post(SurveyHandlers.all_survey_data);
//
};
