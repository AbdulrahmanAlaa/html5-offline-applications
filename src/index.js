'use strict';
import 'babel-polyfill';

import { logEvent } from './assets/js/util';
import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/feedback.scss';
import './assets/css/index.scss';
import home from './Components/Home/home.html';
import feedback from './Components/feedback/feedback.html';
import localStorage from './Components/LocalStorage/localStorage.html';
import geoLocation from './Components/geolocation/geoLocation.html';
const registerRoutes = async () => {
  document.querySelector('.container').innerHTML = home;

  document.querySelectorAll('.nav-item').forEach(ele =>
    ele.addEventListener('click', async e => {
      const route = ele.getAttribute('route');
      let template = null;
      let m = null;
      switch (route) {
        case 'feed-back':
          m = await import('./assets/js/feedback');
          template = feedback;
          break;

        case 'geo-location':
          m = await import('./assets/js/geolocation');
          template = geoLocation;
          break;

        case 'local-storage':
          m = await import('./assets/js/localStorage');
          template = localStorage;
          break;

        default:
          template = home;
          break;
      }
      document.querySelector('.container').innerHTML = template;
      if (m) m.load();
    })
  );
};

if (window.applicationCache) {
  window.applicationCache.onchecking = () => {
    logEvent('Checking Cache');
  };
  window.applicationCache.ondownloading = () => {
    logEvent('Downloading');
  };
  window.applicationCache.onnoupdate = () => {
    logEvent('No Update');
  };
  window.applicationCache.onupdateready = e => {
    logEvent('Update Ready');
    logEvent('Swapping Cache');
    window.applicationCache.swapCache();
    window.location.reload();
  };
}

window.addEventListener('load', () => logEvent('Window Load'));
registerRoutes();
