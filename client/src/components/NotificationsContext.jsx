import React, { createContext, Component } from 'react';

const NotificationsContext = createContext();

class NotificationsProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notifications: [],
    };

    this.addNotification = this.addNotification.bind(this);
    this.clearNotification = this.clearNotification.bind(this);
  }

  addNotification(message, type) {
    const { notifications } = this.state;
    this.setState({
      notifications: [
        ...notifications,
        {
          message,
          type,
          id: notifications.length + 1,
        },
      ],
    });
  }

  clearNotification(id) {
    const { notifications } = this.state;

    this.setState({
      notifications: notifications.filter(
        notification => notification.id !== id
      ),
    });
  }

  render() {
    const { notifications } = this.state;

    return (
      <NotificationsContext.Provider
        value={{
          addNotification: this.addNotification,
          clearNotification: this.clearNotification,
          notifications,
        }}
      >
        {this.props.children}
      </NotificationsContext.Provider>
    );
  }
}

const NotificationsConsumer = NotificationsContext.Consumer;

export { NotificationsConsumer, NotificationsProvider };
export default NotificationsContext;
