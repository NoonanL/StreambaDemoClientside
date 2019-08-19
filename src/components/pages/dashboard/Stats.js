import React from "react";
import styled from "styled-components";

import {
  CardContent as MuiCardContent,
  Card as MuiCard,
  Typography as MuiTypography,
  Box
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

const Typography = styled(MuiTypography)(spacing);

const Card = styled(MuiCard)`
  background: ${props => props.background};
  color: ${props => props.color};
  margin-bottom: ${props => props.theme.spacing(3)}px;
`;

const CardContent = styled(MuiCardContent)`
  position: relative;
  margin: ${props => props.theme.spacing(2)}px;

  &:last-child {
    padding-bottom: ${props => props.theme.spacing(4)}px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 32px;

  svg {
    width: 32px;
    height: 32px;
    color: ${props =>
      props.color ? props.color : props.theme.palette.secondary.main};
  }
`;

function Stats({ title, amount, icon: Icon, value, background, contrastText }) {
  return (
    <Card mb={3} background={background} color={contrastText}>
      <CardContent>
        <Typography variant="h3" gutterBottom>
          <Box fontWeight="fontWeightRegular">{amount}</Box>
        </Typography>
        <Typography variant="body2" gutterBottom mt={3} mb={0}>
          {title}
        </Typography>

        <IconWrapper color={contrastText}>
          <Icon />
        </IconWrapper>
      </CardContent>
    </Card>
  );
}

export default Stats;
