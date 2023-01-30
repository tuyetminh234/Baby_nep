const DEFAULT_STATE = {
  userList: [
    {
      id: 1,
      username: "man.nguyen",
      fullName: "Man Ng",
      password: "123",
      phoneNumber: "12345678",
      email: "man@gmail.com",
      type: "Client",
    },
    {
      id: 2,
      username: "khai.tran",
      fullName: "Khai Tran",
      password: "123",
      phoneNumber: "12345678",
      email: "khai@gmail.com",
      type: "Admin",
    },
  ],
  selectedUser: null,
};

export const hookUserReducer = (state = DEFAULT_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_USER": {
      const data = [...state.userList];
      data.push({
        ...payload,
        id: Date.now(),
      });
      state.userList = data;
      break;
    }
    case "SET_SELECTED_USER": {
      state.selectedUser = payload;

      break;
    }
    case "UPDATE_USER": {
      // const data = [...state.userList];

      // const idx = data.findIndex((element) => element.id === payload.id);

      // data[idx] = payload;

      // state.userList = data;
      state.selectedUser = null;

      // [A,B,C] => [a,b,c] => map
      // ele => ele.toLowerCase()

      // [A,B,C] => [A,b,C] => map
      // ele => ele === 'B' ? ele.toLowerCase() : ele
      state.userList = state.userList.map(ele => ele.id === payload.id ? payload : ele);

      break;
    }
      case "DELETE_USER": {
      // const data = [...state.userList];
      // const idx = data.findIndex(ele => ele.id === payload.id)

      // data.splice(idx, 1);
      // state.userList = data;

      // [A,B,C] => [A,B,C] => filter => true
      // [A,B,C] => [] => filter => false

      // [A,B,C] => [A,C] => filter => ele => ele === 'B' ? false : true 

      state.userList = state.userList.filter(ele => ele.id  === payload.id ? false : true );

      break;
    }
    default:
      break;
    }
    return { ...state };
};
