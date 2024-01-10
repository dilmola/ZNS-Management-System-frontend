import React from 'react';

import Accepted from '../../img/icon/icon_status/accepted.png';
import Rejected from '../../img/icon/icon_status/rejected.png';
import Pending from '../../img/icon/icon_status/pending.png';

export const getStatusIcon = (status) => {
  switch (status) {
    case 'Accepted':
      return <img src={Accepted} alt="Accepted" />;
    case 'Rejected':
      return <img src={Rejected} alt="Rejected" />;
    case 'Pending':
      return <img src={Pending} alt="Pending" />;
    default:
      return <span>Status not found</span>; // Add fallback content
  };
};
