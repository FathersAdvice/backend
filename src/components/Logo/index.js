import React, { useEffect } from "react";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import {
  convertSimpleFormat,
  convertObjectFormat,
} from "../../helpers/css-helpers";
import { PropTypes } from "prop-types";
import classname from 'classname';

import {classFonts} from '../../theme';
import "./index.css";

const checkSize = (size) => {
  let returnedSize;
  switch (size) {
    case "small":
      returnedSize = {
        fontSize: 20,
        width: 165,
        height: 50,
      };
      break;
    case "middle":
      returnedSize = {
        fontSize: 30,
        width: 245,
        height: 70,
      };
      break;
    case "big":
      returnedSize = {
        fontSize: 40,
        width: 325,
        height: 100,
      };
      break;
    default:
      returnedSize = {
        fontSize: 50,
        width: 405,
        height: 110,
      };
  }
  return returnedSize;
};

const Logo = ({ size }) => {
  const sizeLogo = checkSize("big11");
  const styles = convertObjectFormat(sizeLogo);
  useEffect(() => {
    let logoContainer = document.querySelector(".logotype-fathers-advice");
    logoContainer.onclick = function (e) {
      const { pageY, pageX, target } = e;
      const color = ["#fff", "#89cff0", "#dcdcdc", "#ffc0cb"];
      const x = pageX - target.offsetLeft;
      const y = pageY - target.offsetTop;
      const ripple = document.createElement("span");
      ripple.style.left = convertSimpleFormat(x);
      ripple.classList = "ripple";
      ripple.style.borderColor = color[Math.floor(Math.random() * 4)];
      ripple.style.top = convertSimpleFormat(y);
      this.appendChild(ripple);
      setTimeout(() => {
        ripple.remove();
      }, 2000);
    };
  }, [size]);

  return (
    <div className={classname(classFonts.themeLogoFonts ,"logotype-fathers-advice")} style={styles}>
      <div
        className="logotype-fathers-advice__letter"
        style={{ height: convertSimpleFormat(sizeLogo.height / 2) }}
      >
        Father`sAdvice
      </div>
      <div
        className={classname(classFonts.themeFontTextItalic, "logotype-fathers-advice__icons")}
        style={{ width: convertSimpleFormat(sizeLogo.width / 2) }}
      >
        <span style={{ fontSize: convertSimpleFormat(sizeLogo.fontSize / 3) }}>
          Improve yourself
        </span>
        <AutoStoriesIcon
          color="primary"
          sx={{
            marginLeft: "5px",
            fontSize: convertSimpleFormat(sizeLogo.fontSize),
          }}
        />
      </div>
      <div
        className="logotype-fathers-advice__br"
        style={{ left: convertSimpleFormat(sizeLogo.width / 2 + 15) }}
      />
    </div>
  );
};

Logo.propTypes = {
  size: PropTypes.oneOf(["small", "big", "middle"]),
};

export default Logo;
