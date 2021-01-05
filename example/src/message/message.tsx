import * as React from "react";
import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

// message event channel
const channel = new EventTarget();

// event define
type MessageAddEvent = CustomEvent<string>;
const MessageAddEventName = "message-add";

type MessageItemData = {
  message;
  createTime: number;
};

// message item component
type MessageItemProps = {
  data: MessageItemData;
  onExited: (data: MessageItemData) => void;
};

const MessageItem = React.memo<MessageItemProps>(
  (props) => {
    const [visible, setVisible] = useState(false);
    const { data, onExited } = props;
    const { message } = data;

    console.log(`message item re-render, (${message})`);

    const onTransitionExited = React.useCallback(() => {
      console.log(`message(${message}) deleted`);
      onExited(data);
    }, []);

    // component lifecycle
    useEffect(() => {
      setVisible(true);
      console.log(`message(${message}) created`);
      const destroyTimer = window.setTimeout(
        () => setVisible(false),
        2000 + 200
      );

      return () => {
        window.clearTimeout(destroyTimer);
        setVisible(false);
      };
    }, []);

    return (
      <CSSTransition
        timeout={200 - 20}
        in={visible}
        unmountOnExit
        onExited={onTransitionExited}
        classNames="fade-move-down"
      >
        <div className="message-item">
          <span>{message}</span>
        </div>
      </CSSTransition>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.onExited === nextProps.onExited &&
      prevProps.data === nextProps.data
    );
  }
);

// message component
const MessageComponent = React.memo(() => {
  const [messageList, setMessageList] = React.useState<MessageItemData[]>([]);
  const messageListRef = React.useRef<MessageItemData[]>([]);

  // update list ref
  useEffect(() => {
    messageListRef.current = messageList;
  }, [messageList]);

  // message event handler
  useEffect(() => {
    function receiveMessage(e: MessageAddEvent) {
      if (!(e instanceof CustomEvent)) return;
      if (e.type !== MessageAddEventName) return;
      console.log(`new message receive: ${e.detail}`);
      setMessageList([
        ...messageList,
        {
          message: e.detail,
          createTime: Date.now(),
        },
      ]);
    }
    channel.addEventListener(MessageAddEventName, receiveMessage);
    return () => {
      channel.removeEventListener(MessageAddEventName, receiveMessage);
    };
  });

  // define delete function
  const deleteByCreateTime = React.useCallback(
    ({ createTime: time }: MessageItemData) => {
      const messageList = messageListRef.current;
      const newList = messageList.filter(
        ({ createTime }) => createTime !== time
      );
      setMessageList(newList);
    },
    []
  );

  return (
    <div className="message-root">
      {messageList.map((data) => (
        <MessageItem
          data={data}
          key={data.createTime}
          onExited={deleteByCreateTime}
        />
      ))}
    </div>
  );
});

(function main() {
  const node = document.createElement("div");
  document.body.append(node);
  ReactDOM.render(<MessageComponent />, node);
})();

export default class Message {
  static info(message: string) {
    channel.dispatchEvent(
      new CustomEvent(MessageAddEventName, { detail: message })
    );
  }
}
