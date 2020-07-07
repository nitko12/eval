import * as React from "react";
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { Button } from "baseui/button";
import { useStyletron } from "baseui";
import { Card, StyledBody, StyledAction } from "baseui/card";
import { colors } from "baseui/tokens";

export default () => {
  const [css, theme] = useStyletron();
  return (
    <div style={{ backgroundColor: colors.blue50 }}>
      <HeaderNavigation>
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem>Logo</StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.center} />
        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem>
            <StyledLink href="#basic-link1">Quick run</StyledLink>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <StyledLink href="#basic-link1">Dashboard</StyledLink>
          </StyledNavigationItem>
          <StyledNavigationItem>
            <StyledLink href="#basic-link2">About us</StyledLink>
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem>
            <Button>Create a test</Button>
          </StyledNavigationItem>
        </StyledNavigationList>
      </HeaderNavigation>

      <Card>
        <StyledBody>
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
          faucibus ex, non facilisis nisl. Proin ut dui sed metus pharetra hend
          rerit vel non mi. Nulla ornare faucibus ex, non facilisis nisl.
        </StyledBody>
        <StyledAction>
          <Button
            overrides={{
              BaseButton: { style: { width: "100%" } },
            }}
          >
            Button Label
          </Button>
        </StyledAction>
      </Card>
    </div>
  );
};
