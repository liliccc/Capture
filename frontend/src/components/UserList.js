import React, { useState, useEffect } from 'react';
import * as apiCalls from '../api/apiCalls';
import UserListItem from './UserListItem';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Snackbar from '@mui/material/Snackbar';

const UserList = (props) => {
  const [page, setPage] = useState({
    content: [],
    number: 0,
    size: 9
  });

  const [loadError, setLoadError] = useState();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = (requestedPage = 0) => {
    apiCalls
      .listUsers({ page: requestedPage, size: 8 })
      .then((response) => {
        setPage(response.data);
        setLoadError();
      })
      .catch((error) => {
        setLoadError('User load failed');
      });
  };

  const onClickNext = () => {
    loadData(page.number + 1);
  };

  const onClickPrevious = () => {
    loadData(page.number - 1);
  };

  const { content, first, last } = page;

  return (
    <Card>
      <CardContent>
        <h3 style={{ marginLeft: 120, color: '#0984e3' }}>Users</h3>
        <List data-testid="usergroup">
          {content.map((user) => {
            return <UserListItem key={user.username} user={user} />;
          })}
        </List>
      </CardContent>
      <div>
        {!first && (
          <Button
            variant="contained"
            style={{ marginLeft: 20, marginBottom: 20 }}
            onClick={onClickPrevious}
          >{`< previous`}</Button>
        )}

        {!last && (
          <Button
            variant="contained"
            style={{ marginLeft: 110, marginBottom: 20 }}
            onClick={onClickNext}
          >
            {`next >`}
          </Button>
        )}
      </div>
      {loadError && <Snackbar>{loadError}</Snackbar>}
    </Card>
  );
};

export default UserList;
