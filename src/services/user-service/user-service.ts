export function UseUser() {
  const getUserId = () => {
    let id = localStorage.getItem('chess_user_id');
    if (!id) {
      id = Math.random().toString(36).substring(7);
      localStorage.setItem('chess_user_id', id);
    }
    return id;
  }; return { getUserId };
}