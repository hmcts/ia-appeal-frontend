const paths = require('../../../paths');
const pathRedirector = require('../../../services/pathRedirector');
const juiLinkBuilder = require('../../../services/juiLinkBuilder');

module.exports = async(req, res) => {

  console.debug("Controller: " + __filename);

  console.debug("=================");
  console.debug("SESSION:");
  console.debug(req.session);
  console.debug("=================");

  req.session.createAppeal = req.session.createAppeal || {};
  req.session.createAppeal.appealReason = req.session.createAppeal.appealReason || {};

  let values = {
    backUrl: paths.createAppealAddress,
    dashBoardUrl: juiLinkBuilder.buildLinkToDashboard(req),
    signOutUrl: juiLinkBuilder.buildLinkToSignOut(req),
    data: {},
    errors: {},
    errorsSummary: [],
  };

  values.data = JSON.parse(JSON.stringify(req.session.createAppeal.appealReason));

  if (req.method == 'POST') {
    const post = req.postData || {};

    console.debug("=================");
    console.debug("POST:");
    console.debug(post);
    console.debug("=================");

    values.data.appealReason = post['appeal-reason'];

    if (!values.data.appealReason) {
      values.errors.appealReason = {
        text: 'You must provide a reason for this appeal',
        href: "#appeal-reason"
      };

      values.errorsSummary.push(values.errors.appealReason);
    }

    if (!Object.keys(values.errors).length) {

      if (values.data.appealReason == 'protectionClaimRefused') {
        values.data.formattedAppealReason = 'My client\'s protection claim was refused';
      } else {
        values.data.formattedAppealReason = 'My client\'s protection status was revoked';
      }

      req.session.createAppeal.appealReason = values.data;

      return pathRedirector.redirectTo(req, res, paths.createAppealGroundsOfAppeal);
    }
  }

  console.debug("=================");
  console.debug("VALUES:");
  console.debug(values);
  console.debug("=================");

  res.render(
    'forms/create-appeal/appeal-reason.njk',
    values
  );
};
