import { ToggleButtonGroup, ToggleButton, Typography } from '@mui/material';
import { useState } from 'react';
import { appText } from '../../assets/text';
import store from '../../stores/store';
import { OrderCategory as OrderFilter } from '../../utility/orderEnums';

export default function ToggleFilters() {
    const handleFilters = (event: React.MouseEvent<HTMLElement>, value: OrderFilter[]) => {
        store.order.setPresetFilters(value);
    };

    return (
        <div>
            <Typography variant="h3">{appText.filter()}</Typography>
            <ToggleButtonGroup value={store.order.presetFilters} size="small" onChange={handleFilters} aria-label="filter orders">
                <ToggleButton value={OrderFilter.overBudget} aria-label="over-budget">
                    Over budget
                </ToggleButton>
            </ToggleButtonGroup>
            {/* ...
            <ToggleButtonGroup exclusive value={store.order.presetFilters} size="small" onChange={handleFilters} aria-label="filter orders">
                <ToggleButton value={OrderFilter.exposure} aria-label="exposure-order">
                    Exposure
                </ToggleButton>
                <ToggleButton value={OrderFilter.specifics} aria-label="specific-order">
                    Specifics
                </ToggleButton>
            </ToggleButtonGroup> */}
        </div>
    );
}
