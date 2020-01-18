import * as React from 'react';
import { Link, LinkProps } from "react-router-dom";
import Button, { ButtonProps } from '@material-ui/core/Button';

type Props = ButtonProps & LinkProps;

export default function RouterButton(props: Props) {
  return <Button component={Link} {...props} />;
}
