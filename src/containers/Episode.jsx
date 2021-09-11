import React, { useEffect } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import 'antd/dist/antd.css';

import TableEpisode from '../components/TableEpisode';

const Episode = () => {
  useEffect(() => {
    toastr.error('El título de beneficio es requerido.');
  }, []);

  return <TableEpisode />;
};

export default Episode;
