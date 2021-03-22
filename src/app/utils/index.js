import ROLES from "constants/roles";

export const normalizeUser = (authUser) => ({
  name: authUser.displayName,
  email: authUser.email,
  photoURL: authUser.photoURL,
  emailVerified: authUser.emailVerified,
  uid: authUser.uid,
});

const getRole = (user) => {
  if (isUserUniqueAndVerified(user)) {
    return ROLES.FULL_USER;
  } else if (user.uid && !user.emailVerified) {
    return ROLES.UNVERIFIED_USER;
  } else {
    return ROLES.VISITOR;
  }
};

export const assignRole = (user) => {
  const role = getRole(user);
  return { ...user, role: [role] };
};

export const actionCreator = (type) => (payload) => ({ type, payload });

export const handleChange = (actionType, dispatch) => (event) => {
  const {
    target: { value },
  } = event;
  const action = actionCreator(actionType);

  dispatch(action(value));
};

export const defaultCondition = (value) => !!value && value.uid;

const pad = (val) => (val < 10 ? `0${val}` : val);

const getTime = (date) => {
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  return `${hours}:${minutes}:${seconds}`;
};

const getDate = (separator) => (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return [year, month, day].join(separator);
};

export const parseDate = (timeString) => {
  const date = new Date(timeString);
  return `${getTime(date)} ${getDate("/")(date)}`;
};

export const isUserUniqueAndVerified = (user) => {
  if (!user) {
    return false;
  }

  return user.uid && user.emailVerified;
};
