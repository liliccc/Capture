import React, { useState, useEffect } from 'react';
import * as apiCalls from '../api/apiCalls';
import Spinner from './Spinner';
import MessageContainer from './MessageContainer';
import Modal from './Modal';

const HoaxFeed = (props) => {
  const [page, setPage] = useState({ content: [] });
  const [isLoadingMessages, setLoadingMessages] = useState(false);
  const [isLoadingOldMessages, setLoadingOldMessages] = useState(false);
  const [isLoadingNewMessages, setLoadingNewMessages] = useState(false);
  const [isDeletingHoax, setDeletingHoax] = useState(false);
  const [newHoaxCount, setNewHoaxCount] = useState(0);
  const [hoaxToBeDeleted, setHoaxToBeDeleted] = useState();

  useEffect(() => {
    const loadMessages = () => {
      setLoadingMessages(true);
      apiCalls.loadMessages(props.user).then((response) => {
        setLoadingMessages(false);
        setPage(response.data);
      });
    };
    loadMessages();
  }, [props.user]);

  useEffect(() => {
    const checkCount = () => {
      const Messages = page.content;
      let topHoaxId = 0;
      if (Messages.length > 0) {
        topHoaxId = Messages[0].id;
      }
      apiCalls.loadNewHoaxCount(topHoaxId, props.user).then((response) => {
        setNewHoaxCount(response.data.count);
      });
    };
    const counter = setInterval(checkCount, 3000);
    return function cleanup() {
      clearInterval(counter);
    };
  }, [props.user, page.content]);

  const onClickLoadMore = () => {
    if (isLoadingOldMessages) {
      return;
    }
    const Messages = page.content;
    if (Messages.length === 0) {
      return;
    }
    const hoaxAtBottom = Messages[Messages.length - 1];
    setLoadingOldMessages(true);
    apiCalls
      .loadOldMessages(hoaxAtBottom.id, props.user)
      .then((response) => {
        setPage((previousPage) => ({
          ...previousPage,
          last: response.data.last,
          content: [...previousPage.content, ...response.data.content],
        }));
        setLoadingOldMessages(false);
      })
      .catch((error) => {
        setLoadingOldMessages(false);
      });
  };

  const onClickLoadNew = () => {
    if (isLoadingNewMessages) {
      return;
    }
    const Messages = page.content;
    let topHoaxId = 0;
    if (Messages.length > 0) {
      topHoaxId = Messages[0].id;
    }
    setLoadingNewMessages(true);
    apiCalls
      .loadNewMessages(topHoaxId, props.user)
      .then((response) => {
        setPage((previousPage) => ({
          ...previousPage,
          content: [...response.data, ...previousPage.content],
        }));
        setLoadingNewMessages(false);
        setNewHoaxCount(0);
      })
      .catch((error) => {
        setLoadingNewMessages(false);
      });
  };

  const onClickModalOk = () => {
    setDeletingHoax(true);
    apiCalls.deleteHoax(hoaxToBeDeleted.id).then((response) => {
      setPage((previousPage) => ({
        ...previousPage,
        content: previousPage.content.filter(
          (hoax) => hoax.id !== hoaxToBeDeleted.id
        ),
      }));
      setDeletingHoax(false);
      setHoaxToBeDeleted();
    });
  };

  if (isLoadingMessages) {
    return <Spinner />;
  }
  if (page.content.length === 0 && newHoaxCount === 0) {
    return (
      <div className="card card-header text-center">There are no Messages</div>
    );
  }
  const newHoaxCountMessage =
    newHoaxCount === 1
      ? 'There is 1 new hoax'
      : `There are ${newHoaxCount} new Messages`;
  return (
    <div>
      {newHoaxCount > 0 && (
        <div
          className="card card-header text-center"
          onClick={onClickLoadNew}
          style={{
            cursor: isLoadingNewMessages ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoadingNewMessages ? <Spinner /> : newHoaxCountMessage}
        </div>
      )}
      {page.content.map((hoax) => {
        return (
          <MessageContainer
            key={hoax.id}
            message={hoax}
            onClickDelete={() => setHoaxToBeDeleted(hoax)}
          />
        );
      })}
      {page.last === false && (
        <div
          className="card card-header text-center"
          onClick={onClickLoadMore}
          style={{
            cursor: isLoadingOldMessages ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoadingOldMessages ? <Spinner /> : 'Load More'}
        </div>
      )}
      <Modal
        visible={hoaxToBeDeleted && true}
        onClickCancel={() => setHoaxToBeDeleted()}
        body={
          hoaxToBeDeleted &&
          `Are you sure to delete '${hoaxToBeDeleted.content}'?`
        }
        title="Delete!"
        okButton="Delete Hoax"
        onClickOk={onClickModalOk}
        pendingApiCall={isDeletingHoax}
      />
    </div>
  );
};

export default HoaxFeed;
