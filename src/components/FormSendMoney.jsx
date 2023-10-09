function FormSendMoney({ state, onSetInput, onSendMoney }) {
  const {
    senderAmount,
    receiverId,
    senderId,
    issenderIdError,
    senderIdError,
    issenderAmountError,
    senderAmountError,
    isreceiverIdError,
    receiverIdError,
  } = state;

  return (
    <form className="transfer__form" onSubmit={onSendMoney}>
      <div className="relative">
        <input
          type="number"
          name="senderId"
          placeholder="Sender Account No."
          className={
            issenderIdError
              ? "border-1 border-rose-500"
              : "border-[2px_solid_rgba(0,0,0,0.2)]"
          }
          value={senderId}
          onChange={onSetInput}
        />
        {issenderIdError ? (
          <small className="absolute bottom-[-1.8rem] left-0 text-lg text-red-500">
            {senderIdError}
          </small>
        ) : (
          ""
        )}
      </div>

      <div className="relative">
        <input
          type="number"
          name="receiverId"
          placeholder="Receiver Account No."
          className={
            isreceiverIdError
              ? "border-1 border-rose-500"
              : "border-[2px_solid_rgba(0,0,0,0.2)]"
          }
          value={receiverId}
          onChange={onSetInput}
        />{" "}
        {isreceiverIdError ? (
          <small className="absolute bottom-[-1.8rem] left-0 text-lg text-red-500">
            {receiverIdError}
          </small>
        ) : (
          ""
        )}
      </div>
      <div className="relative">
        <input
          type="number"
          name="senderAmount"
          placeholder="Amount"
          className={
            issenderAmountError
              ? "border-1 border-rose-500"
              : "border-[2px_solid_rgba(0,0,0,0.2)]"
          }
          value={senderAmount}
          onChange={onSetInput}
        />
        {issenderAmountError ? (
          <small className="absolute bottom-[-1.8rem] left-0 text-lg text-red-500">
            {senderAmountError}
          </small>
        ) : (
          ""
        )}
      </div>

      <button>Send Money</button>
    </form>
  );
}

export default FormSendMoney;
