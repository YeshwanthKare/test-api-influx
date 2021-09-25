import { testData, testDataSecond } from './mocks';

const HTTP_ROUTES = {
  ROOT: 'https://api.1ot.mobi/v1',
  ACCOUNT_SIMS: 'get_account_sims',
  ACCOUNT_ALERTS: 'get_account_alerts',
  ACCOUNT_BALANCE: 'get_account_balance',
  SIM_SESSIONS: 'get_sim_sessions',
};

const API = {

  async getData( route = '', params = '' ) {
    const response = await fetch(`${HTTP_ROUTES.ROOT}/${route}/?${params}`, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('key'),
      },
      redirect: 'follow'
    });
    return await response.json();
  },

  loadGeneralTable() {
    return this.getData(HTTP_ROUTES.ACCOUNT_SIMS).then(data => data.sims);
  },

  loadErrorsTable() {
    return this.getData(HTTP_ROUTES.ACCOUNT_ALERTS).then(data => data.alerts);
  },

  loadBalanceTable() {
    return this.getData(HTTP_ROUTES.ACCOUNT_BALANCE).then(data => [data]);
  },

  loadDeviceTable(iccid, startDate, endDate) {
    return this.getData(HTTP_ROUTES.SIM_SESSIONS, `iccid=${iccid}&from=${startDate}&to=${endDate}`).then(data => {
      console.log(startDate);
      if (startDate >= 1630447200000) {
        return testDataSecond;
      }
      return testData;
    });
  }
};

export default API;
