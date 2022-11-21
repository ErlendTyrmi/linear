import { ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import store from '../../stores/store';
import { OrderFilter } from '../../utility/orderEnums';

export default function ToggleFilters() {
    const handleFilters = (event: React.MouseEvent<HTMLElement>, value: OrderFilter) => {
        store.order.setFilter(value);
    };

    return (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                <ToggleButtonGroup exclusive color="primary" value={store.order.filter} onChange={handleFilters} aria-label="filter-orders">
                    <ToggleButton value={OrderFilter.overBudget} aria-label="over-budget">
                        Over budget
                    </ToggleButton>

                    <ToggleButton value={OrderFilter.exposure} aria-label="over-budget">
                        Exposure
                    </ToggleButton>

                    <ToggleButton value={OrderFilter.specific} aria-label="over-budget">
                        Specific
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </div>
    );
}
