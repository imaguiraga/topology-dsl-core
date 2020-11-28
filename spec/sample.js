import { 
  choice,
  terminal,
  sequence,
  repeat,
  zeroOrMore,
  optional
} from "../dist/index";

export const testflow = choice(
  terminal("a")._in_("a","b")._out_("a","b"),
  choice("e", "d"),
  sequence(terminal("b"), terminal("c")._in_("a","b"),sequence("c","d")._in_("a","b")._out_("e","f")),
  sequence("c","d")
);

export const selectClause = () => sequence("a", "b", repeat(optional("c")), zeroOrMore("d"));
export const fromClause = function a() {
    return  choice("1", "2", selectClause, "4");
};
