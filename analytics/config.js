/* Public settings only. The sheets are private: they open only for a Google account that already has access. */
window.CA_CONFIG = {
  clientId: 'PASTE_CLIENT_ID.apps.googleusercontent.com',
  params: {days: '7'},
  datasets: {
    events:  {sheet: '1FCS-3ouYsmGDplpklWM2T0c4g47q3uaPw0ZCgmBqvMc', range: 'Events!A:K'},
    leads:   {sheet: '1FCS-3ouYsmGDplpklWM2T0c4g47q3uaPw0ZCgmBqvMc', range: 'Leads!C:J'},
    orders:  {sheet: '1o3xUXqd20h2C9D7zttaOdypaiO9qcLr1UUf3XTYZXis', range: 'Orders!A:D'},
    members: {sheet: '1o3xUXqd20h2C9D7zttaOdypaiO9qcLr1UUf3XTYZXis', range: 'Members!A:C'}
  }
};
