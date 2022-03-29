import { useCallback } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import Search from "@icons/Search";
import Close from "@icons/Close";

const noop = (value: any) => {};

export default function SearchInput({
  value,
  onChange = noop,
  searching,
  onSearchingChange = noop,
}) {
  const handleFocus = useCallback(() => {
    if (!searching) {
      onSearchingChange(true);
    }
  }, [onSearchingChange, searching]);

  const handleClose = useCallback(() => {
    onChange("");
    onSearchingChange(false);
  }, [onChange, onSearchingChange]);

  const handleChange = useCallback(
    (event) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <InputGroup>
      <style jsx>{`
        .close {
          position: absolute;
          right: 0.45rem;
          top: 0.25rem;
          z-index: 1000;
        }

        .search {
          position: absolute;
          z-index: 1000;
          left: 0.45rem;
          top: 0.25rem;
        }

        .input {
          padding-left: 2rem;
        }
      `}</style>

      <span className="search text-secondary">
        <Search />
      </span>
      <input
        className="form-control rounded-3 input"
        placeholder="Search"
        onFocus={handleFocus}
        value={value}
        onChange={handleChange}
      />
      {searching && (
        <span className="close">
          <button
            className="bg-white border-0 text-secondary"
            onClick={handleClose}
          >
            <Close />
          </button>
        </span>
      )}
    </InputGroup>
  );
}
