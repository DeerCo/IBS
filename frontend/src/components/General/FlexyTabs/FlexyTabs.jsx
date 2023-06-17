import PropTypes from 'prop-types';
import { Box, Card, CardContent, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`tabanel-${index}`} {...other}>
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );
};

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

const FlexyTabs = (props) => {
    const { tabs, width, height } = props;

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Card sx={{ p: { xs: '20px', sm: '35px', lg: '35px' }, width: width, height: height }}>
            <CardContent sx={{ p: 0 }}>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="secondary"
                            allowScrollButtonsMobile
                            scrollButtons
                            indicatorColor="secondary"
                        >
                            {tabs.map((tab) => {
                                return (
                                    <Tab
                                        sx={{ textTransform: 'capitalize' }}
                                        label={tab.tabName}
                                        id={tab.tabId}
                                    />
                                );
                            })}
                        </Tabs>
                    </Box>
                    {tabs.map((tab) => {
                        return (
                            <TabPanel value={value} index={tab.tabId} component="div">
                                <Typography
                                    fontWeight="500"
                                    sx={{
                                        fontSize: {
                                            xs: '16px',
                                            sm: '24px',
                                            lg: '24px'
                                        }
                                    }}
                                >
                                    {tab.tabSubheading}
                                </Typography>
                                {tab.tabContext}
                            </TabPanel>
                        );
                    })}
                </Box>
            </CardContent>
        </Card>
    );
};

FlexyTabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            tabName: PropTypes.string.isRequired,
            tabId: PropTypes.number.isRequired,
            tabSubheading: PropTypes.string.isRequired,
            tabContent: PropTypes.elementType.isRequired
        })
    ).isRequired,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
export default FlexyTabs;
