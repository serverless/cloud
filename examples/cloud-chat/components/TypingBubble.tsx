import TypingIndicator from "@icons/TypingIndicator";

export default function MessageBubble() {
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
      <li className="d-flex align-items-center mb-2">
        <p className="bg-light receive">
          <TypingIndicator />
        </p>
      </li>
    </>
  );
}
