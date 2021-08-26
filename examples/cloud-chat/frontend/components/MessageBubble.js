import clsx from "clsx";

export default function MessageBubble({ message, sent }) {
  return (
    <>
      <style jsx>{`
        p {
          max-width: 66%;
          word-wrap: break-word;
          line-height: 24px;
          position: relative;
          padding: 10px 20px;
          border-radius: 25px;
          margin: 5px;
        }

        p:before {
          width: 20px;
          content: "";
          position: absolute;
          bottom: 0;
          height: 25px;
        }

        p:after {
          width: 26px;
          content: "";
          position: absolute;
          bottom: 0;
          height: 25px;
        }

        .send:before {
          right: -7px;
          border-bottom-left-radius: 16px 14px;
          background-color: #0d6efd;
        }

        .send:after {
          right: -26px;
          border-bottom-left-radius: 10px;
          background-color: #fff;
        }

        .receive:before {
          left: -7px;
          border-bottom-right-radius: 16px 14px;
          background-color: #f8f9fa;
        }

        .receive:after {
          left: -26px;
          background-color: #fff;
          border-bottom-right-radius: 10px;
        }
      `}</style>
      <li
        className={clsx(
          "d-flex align-items-center overflow-hidden",
          sent && "flex-row-reverse"
        )}
      >
        <p
          className={clsx(
            sent ? "bg-primary text-white send" : "bg-light receive"
          )}
        >
          {message.value.text}
        </p>
      </li>
    </>
  );
}
