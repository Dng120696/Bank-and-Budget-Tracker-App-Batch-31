function FormSendMoney({ state, dispatch }) {
  const { senderAmount, receiverId, senderId } = state;
  return (
    <form
      className="transfer__form"
      onSubmit={(e) => {
        e.preventDefault();
        dispatch({ type: "SEND_MONEY" });
      }}
    >
      <input
        type="number"
        name="senderID"
        placeholder="Sender ID"
        value={senderId}
        onChange={(e) =>
          dispatch({ type: "SENDER_ID", payload: e.target.value })
        }
      />
      <input
        type="number"
        name="receiverID"
        placeholder="Receiver ID"
        value={receiverId}
        onChange={(e) =>
          dispatch({ type: "RECEIVER_ID", payload: e.target.value })
        }
      />
      <input
        type="number"
        name="senderAmount"
        placeholder="Amount"
        value={senderAmount}
        onChange={(e) =>
          dispatch({
            type: "AMOUNT",
            payload: { field: e.target.name, input: e.target.value },
          })
        }
      />
      <button>Send</button>
    </form>
  );
}

export default FormSendMoney;
