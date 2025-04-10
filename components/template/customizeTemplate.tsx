import React from "react";

const TemplateRenderer = ({ data }: any) => {
  const templates = data.result;

  return (
    <div>
      {templates.map((template: any) => (
        <div
          key={template.id}
          className={template.template_class}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${template.template_col_num}, 1fr)`,
            gridTemplateRows: `repeat(${template.template_row_num}, auto)`,
            gap: "8px",
            padding: "12px",
          }}
        >
          {/* Section Items */}
          {template.section_items.map((item: any) => {
            const isScrolled = item.section_layout_type_name === "scrolled";

            return (
              <div
                key={item.id}
                className={`${item.item_class || ""} ${
                  isScrolled ? "scrollable-container" : ""
                }`}
                style={{
                  gridColumn: `${item.item_x1} / ${item.item_x2 + 1}`,
                  gridRow: `${item.item_y1} / ${item.item_y2 + 1}`,
                  display: "grid",
                  gridTemplateColumns: `repeat(${item.item_col_num}, 1fr)`,
                  gridTemplateRows: `repeat(${item.item_row_num}, auto)`,
                  gap: "4px",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                {/* Card Items */}
                {item.card_items.map((card: any) => {
                  let content;
                  switch (card.section_class_type_name) {
                    case "label":
                      content = (
                        <div style={{ fontWeight: "bold" }}>
                          {card.card_item_value}
                        </div>
                      );
                      break;
                    case "text":
                      content = (
                        <input
                          type="text"
                          readOnly
                          value={card.card_item_value}
                          style={{ width: "100%" }}
                        />
                      );
                      break;
                    case "image":
                      content = (
                        <img
                          src={card.card_item_value}
                          alt={card.card_item_name}
                          style={{ width: "100%", borderRadius: "4px" }}
                        />
                      );
                      break;
                    case "note":
                      content = (
                        <div
                          style={{
                            whiteSpace: "pre-wrap",
                            fontSize: "0.9rem",
                            lineHeight: "1.5",
                          }}
                        >
                          {card.card_item_value}
                        </div>
                      );
                      break;
                    default:
                      content = null;
                  }

                  return (
                    <div
                      key={card.id}
                      className={card.card_item_class}
                      style={{
                        gridColumn: `${card.card_item_x1} / ${
                          card.card_item_x2 + 1
                        }`,
                        gridRow: `${card.card_item_y1} / ${
                          card.card_item_y2 + 1
                        }`,
                      }}
                    >
                      {content}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default TemplateRenderer;
