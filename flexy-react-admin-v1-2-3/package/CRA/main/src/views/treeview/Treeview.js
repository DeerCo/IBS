import React from 'react';
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import { animated } from 'react-spring/dist/react-spring.cjs';
import { Card, Collapse } from '@mui/material';
import FeatherIcon from 'feather-icons-react';

import Breadcrumb from '../../layouts/full-layout/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Treeview',
  },
];

function MinusSquare(props) {
  return (
    <>
      <FeatherIcon icon="folder-minus" style={{ width: 15, height: 15 }} {...props} />
    </>
  );
}

function PlusSquare(props) {
  return (
    <>
      <FeatherIcon icon="folder-plus" style={{ width: 15, height: 15 }} {...props} />
    </>
  );
}

function CloseSquare(props) {
  return (
    <>
      <FeatherIcon icon="folder" style={{ width: 15, height: 15 }} {...props} />
    </>
  );
}

function TransitionComponent(props) {
  //   const style = useSpring({
  //     from: {
  //       opacity: 0,
  //       transform: 'translate3d(20px,0,0)',
  //     },
  //     to: {
  //       opacity: props.in ? 1 : 0,
  //       transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
  //     },
  //   });

  return (
    <animated.div>
      <Collapse {...props} />
    </animated.div>
  );
}

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = styled((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

const Treeview = () => {
  return (
    <PageContainer title="Treeview" description="this is Treeview page">
      {/* breadcrumb */}
      <Breadcrumb title="Treeview" items={BCrumb} />
      {/* end breadcrumb */}
      <Card>
        <TreeView
          aria-label="customized"
          defaultExpanded={['1']}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<CloseSquare />}
          sx={{ height: 200, flexGrow: 1, overflowY: 'auto' }}
        >
          <StyledTreeItem nodeId="1" label="Main">
            <StyledTreeItem nodeId="2" label="Hello" />
            <StyledTreeItem nodeId="3" label="Subtree with children">
              <StyledTreeItem nodeId="6" label="Hello" />
              <StyledTreeItem nodeId="7" label="Sub-subtree with children">
                <StyledTreeItem nodeId="9" label="Child 1" />
                <StyledTreeItem nodeId="10" label="Child 2" />
                <StyledTreeItem nodeId="11" label="Child 3" />
              </StyledTreeItem>
              <StyledTreeItem nodeId="8" label="Hello" />
            </StyledTreeItem>
            <StyledTreeItem nodeId="4" label="World" />
            <StyledTreeItem nodeId="5" label="Something something" />
          </StyledTreeItem>
        </TreeView>
      </Card>
    </PageContainer>
  );
};

export default Treeview;
