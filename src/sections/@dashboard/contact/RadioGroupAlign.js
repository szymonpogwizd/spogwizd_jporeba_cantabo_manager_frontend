import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RadioButtonsGroupAlign({ setAlignValue, alignValue }) {
  const handleAlignChange = (event) => {
    const value = event.target.value;
    setAlignValue(value);
  };

  return (
    <FormControl sx={{ marginBottom: 2 }}>
      <FormLabel id="demo-row-radio-buttons-group-label">
        Sekcja kontakt to miejsce, w którym użytkownicy mogą skontaktować się z administratorem aplikacji w celu zgłoszenia propozycji, błędów lub innych spraw. Zachęcamy do korzystania z tej sekcji, gdy potrzebujesz pomocy lub chcesz zgłosić uwagi dotyczące naszej aplikacji.
        Aby skontaktować się z nami, wypełnij formularz kontaktowy.
      </FormLabel>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Kategorie wiadomości, które możesz wybrać w formularzu:
            </FormLabel>
            <FormLabel id="demo-row-radio-buttons-group-label">
                - Propozycje i sugestie -  jeśli masz pomysł na nową funkcjonalność lub ulepszenie, chętnie go wysłuchamy.
            </FormLabel>
            <FormLabel id="demo-row-radio-buttons-group-label">
            - Pytania -  jeśli masz jakieś pytania dotyczące naszej aplikacji o napisz do nas.
            </FormLabel>
            <FormLabel id="demo-row-radio-buttons-group-label">
            - Inne -  jeśli Twoja wiadomość nie pasuje do żadnej z powyższych kategorii, wybierz tę opcję.
            </FormLabel>


    </FormControl>
  );
}