import React, { useState, useEffect } from 'react';
import * as apiCalls from '../api/apiCalls';
import Spinner from './Spinner';
import MessageContainer from './MessageContainer';
import Modal from './Modal';

const MessagesPage = (props) => {
  const [page, setPage] = useState({ content: [] });
  const [isLoadingMessages, setLoadingMessages] = useState(false);
  const [isLoadingOldMessages, setLoadingOldMessages] = useState(false);
  const [isLoadingNewMessages, setLoadingNewMessages] = useState(false);
  const [isDeletingMessage, setDeletingMessage] = useState(false);
  const [newMessageCount, setNewMessageCount] = useState(0);
  const [MessageToBeDeleted, setMessageToBeDeleted] = useState();

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
      let topMessageId = 0;
      if (Messages.length > 0) {
        topMessageId = Messages[0].id;
      }
      apiCalls.loadNewMessageCount(topMessageId, props.user).then((response) => {
        setNewMessageCount(response.data.count);
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
    const MessageAtBottom = Messages[Messages.length - 1];
    setLoadingOldMessages(true);
    apiCalls
      .loadOldMessages(MessageAtBottom.id, props.user)
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
    let topMessageId = 0;
    if (Messages.length > 0) {
      topMessageId = Messages[0].id;
    }
    setLoadingNewMessages(true);
    apiCalls
      .loadNewMessages(topMessageId, props.user)
      .then((response) => {
        setPage((previousPage) => ({
          ...previousPage,
          content: [...response.data, ...previousPage.content],
        }));
        setLoadingNewMessages(false);
        setNewMessageCount(0);
      })
      .catch((error) => {
        setLoadingNewMessages(false);
      });
  };

  const onClickModalOk = () => {
    setDeletingMessage(true);
    apiCalls.deleteMessage(MessageToBeDeleted.id).then((response) => {
      setPage((previousPage) => ({
        ...previousPage,
        content: previousPage.content.filter(
          (Message) => Message.id !== MessageToBeDeleted.id
        ),
      }));
      setDeletingMessage(false);
      setMessageToBeDeleted();
    });
  };

  if (isLoadingMessages) {
    return <Spinner />;
  }
  if (page.content.length === 0 && newMessageCount === 0) {
    return (
      <div className="card card-header text-center">There are no Messages</div>
    );
  }
  const newMessageCountMessage =
    newMessageCount === 1
      ? 'There is 1 new Message'
      : `There are ${newMessageCount} new Messages`;
  return (
    <div>
      {newMessageCount > 0 && (
        <div
          className="card card-header text-center"
          onClick={onClickLoadNew}
          style={{
            cursor: isLoadingNewMessages ? 'not-allowed' : 'pointer',
          }}
        >
          {isLoadingNewMessages ? <Spinner /> : newMessageCountMessage}
        </div>
      )}
      {page.content.map((Message) => {
        return (
          <MessageContainer
            key={Message.id}
            message={Message}
            onClickDelete={() => setMessageToBeDeleted(Message)}
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
        visible={MessageToBeDeleted && true}
        onClickCancel={() => setMessageToBeDeleted()}
        body={
          MessageToBeDeleted &&
          `Are you sure to delete '${MessageToBeDeleted.content}'?`
        }
        title="Delete!"
        okButton="Delete Message"
        onClickOk={onClickModalOk}
        pendingApiCall={isDeletingMessage}
      />
    </div>
  );
};

export default MessagesPage;
