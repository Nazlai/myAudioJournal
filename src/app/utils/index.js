export const normalizeUser = (authUser) => ({
  name: authUser.displayName,
  email: authUser.email,
  photoUrl: authUser.photoUrl,
  emailVerified: authUser.emailVerified,
  uid: authUser.uid,
});

export const actionCreator = (type) => (payload) => ({ type, payload });

export const handleChange = (actionType, dispatch) => (event) => {
  const {
    target: { value },
  } = event;
  const action = actionCreator(actionType);

  dispatch(action(value));
};

export const defaultCondition = (value) => !!value;
