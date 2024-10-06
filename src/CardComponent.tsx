import { Card } from "./types/cardTypes";
import styles from "./css/card.module.css";
import { parseAction } from "./phases/actions";
import { PlayState } from "./types/gameTypes";

const classColors = {
  bard: "#b86140",
  wizard: "#71318b",
  ranger: "#3f663d",
  fighter: "#9f2924",
  guardian: "#dab230",
  thief: "#084b83",
};

export default function CardComponent({
  card,
  state,
  setState,
  playerNames
}: {
  card: Card;
  state: PlayState;
  setState: (state: PlayState) => void;
  playerNames: string[];
}) {
  function renderSymbol(card: Card) {
    switch (card.kind) {
      case "hero":
        return (
          <>
            <button
              className={styles.heroMinroll}
              onClick={() => {
                parseAction(card.action, state, setState, playerNames);
              }}
            >
              <div>
                {card.minroll}
                {card.minroll >= 0 ? "+" : "-"}
              </div>
            </button>
          </>
        );
      case "item":
      case "cursed_item":
        return (
          <>
            <div>
              <img></img>
            </div>
          </>
        );
      case "magic":
      case "challenge":
        break;
      case "modifier":
        return (
          <>
            <div>
              {card.posModifier && `+${card.posModifier}`}
              {card.posModifier && card.negModifier && "/"}
              {card.negModifier && `-${card.negModifier}`}
            </div>
          </>
        );
    }
  }

  return (
    <div
      className={styles.card}
      style={
        card.kind === "hero" ? { borderColor: classColors[card.class] } : {}
      }
    >
      <h1 className={styles.cardheader}>{card.name}</h1>
      <sub className={styles.cardsub}>
        {card.kind}
        {card.kind === "hero" && `: ${card.class}`}
      </sub>
      <div className={styles.descContainer}>
        {renderSymbol(card)}
        <div className={styles.desc}>{card.desc}</div>
      </div>
    </div>
  );
}
