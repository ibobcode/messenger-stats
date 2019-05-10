import {
  STATUS_UPDATE,
  CHANGE_USERS_FILTER,
  CONVS_META,
  CONV_SET,
  CONVS_RETREIVE,
  PUSH_DATA,
} from './constants';

export const initialState = {
  status: -1,
  conversations: {},
  activeConv: null,
  usersFilter: {},
  error: {},
};

function dashboardReducer(state = initialState, action) {
  let newConvData = {};
  let tmp = null;
  switch (action.type) {
    case STATUS_UPDATE:
      return {
        ...state,
        status: action.payload,
        error: action.meta,
      };
    case CONVS_RETREIVE:
      return {
        ...state,
        conversations: action.payload,
      };
    case CHANGE_USERS_FILTER:
      tmp = { ...state.usersFilter };
      if (action.meta) {
        Object.keys(tmp).forEach(key => {
          tmp[key].status = false;
        });
        tmp[action.payload].status = true;
      } else {
        tmp[action.payload].status = !tmp[action.payload].status;
      }
      return {
        ...state,
        usersFilter: tmp,
      };
    case CONVS_META:
      const newState = { ...state };
      action.payload.forEach(conv => {
        let convId =
          conv.thread_type === 'ONE_TO_ONE'
            ? conv.thread_key.other_user_id
            : conv.thread_key.thread_fbid;
        convId = convId === 'number' ? convId.toString() : convId;
        if (!newState.conversations[convId]) {
          newState.conversations[convId] = { name: conv.name, data: {} };
          conv.all_participants.nodes.forEach(u => {
            let nickname =
              conv.customization_info &&
              conv.customization_info.participant_customizations.length > 0
                ? conv.customization_info.participant_customizations.find(
                    un => un.participant_id === u.messaging_actor.id,
                  )
                : undefined;
            nickname = nickname ? nickname.nickname : '';
            newState.conversations[convId].data[u.messaging_actor.id] = {
              nickname,
              name: u.messaging_actor.name,
              id: u.messaging_actor.id,
              pic: u.messaging_actor.big_image_src.uri,
              words: {},
              messages: {},
              messagesCounter: 0,
              textCounter: 0,
              filesCounter: 0,
              linksCounter: 0,
              gifsCounter: 0,
              picsCounter: 0,
              videosCounter: 0,
              wordsCounter: 0,
              charCounter: 0,
            };
          });
        } else {
          conv.all_participants.nodes.forEach(u => {
            newState.conversations[convId].data[u.node.messaging_actor.id].pic =
              u.node.messaging_actor.big_image_src.uri;
          });
        }
      });
      return newState;
    case CONV_SET:
      tmp = {};
      Object.values(state.conversations[action.payload].data).forEach(u => {
        tmp[u.id] = {
          id: u.id,
          status: true,
        };
      });
      return {
        ...state,
        usersFilter: tmp,
        activeConv: action.payload,
      };
    case PUSH_DATA:
      newConvData = { ...state.conversations[state.activeConv] };
      // action.payload.customization_info.participant_customizations.forEach(
      //   p => {
      //     usersData[p.participant_id] = {
      //       words: {},
      //       messages: {},
      //       messagesCounter: 0,
      //       wordsCounter: 0,
      //       charCounter: 0,
      //     };
      //   },
      // );
      action.payload.messages.nodes.forEach(m => {
        if (
          // eslint-disable-next-line no-underscore-dangle
          m.__typename === 'UserMessage' &&
          newConvData.data[m.message_sender.id]
        ) {
          if (!newConvData.oldest || newConvData.oldest > m.timestamp_precise) {
            newConvData.oldest = m.timestamp_precise;
          }
          if (!newConvData.latest || newConvData.latest < m.timestamp_precise) {
            newConvData.latest = m.timestamp_precise;
          }
          newConvData.data[m.message_sender.id].messages[m.timestamp_precise] =
            m.message.text;
          if (m.blob_attachments.length >= 1) {
            m.blob_attachments.forEach(b => {
              // eslint-disable-next-line
              switch (b.__typename) {
                case 'MessageFile':
                  newConvData.data[m.message_sender.id].filesCounter += 1;
                  break;
                case 'MessageImage':
                  newConvData.data[m.message_sender.id].picsCounter += 1;
                  break;
                case 'MessageVideo':
                  newConvData.data[m.message_sender.id].videosCounter += 1;
                  break;
                case 'MessageAnimatedImage':
                  newConvData.data[m.message_sender.id].gifsCounter += 1;
                  break;
                default:
                  newConvData.data[m.message_sender.id].textCounter += 1;
                  break;
              }
              newConvData.data[m.message_sender.id].messagesCounter += 1;
            });
          } else if (m.extensible_attachment) {
            newConvData.data[m.message_sender.id].linksCounter += 1;
            newConvData.data[m.message_sender.id].messagesCounter += 1;
          } else {
            newConvData.data[m.message_sender.id].textCounter += 1;
            newConvData.data[m.message_sender.id].messagesCounter += 1;
          }
          newConvData.data[m.message_sender.id].charCounter +=
            m.message.text.length;
          tmp = m.message.text.replace(
            // eslint-disable-next-line no-useless-escape
            /[&\/\\#,+÷\-\n\r\↵\^_€°=\[\]!@()$~%.'"`|;:»*?<>{}0-9]/g,
            '',
          );
          tmp = tmp.toLowerCase().split(' ');
          tmp.forEach(w => {
            if (w !== '' && w.length > 1) {
              if (!newConvData.data[m.message_sender.id].words[w]) {
                newConvData.data[m.message_sender.id].words[w] = {
                  count: 0,
                  id: w,
                };
              }
              newConvData.data[m.message_sender.id].words[w].count += 1;
              newConvData.data[m.message_sender.id].wordsCounter += 1;
            }
          });
        }
      });
      // console.log(
      //   `${wordsCounter / 35000} dictionnaire`,
      //   `${(charCounter * 0.4) / 100000} km`,
      // );
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [state.activeConv]: newConvData,
        },
      };
    default:
      return state;
  }
}

export default dashboardReducer;
