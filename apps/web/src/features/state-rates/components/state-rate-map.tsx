'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Button, Input, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { PublicRouteHref } from '@/lib/routes';

import styles from './state-rate-map.module.css';

export interface StateMapRecord {
  code: string;
  name: string;
  slug: string;
  rateCentsPerKwh: number;
  periodFormatted: string;
  region: 'New England' | 'Middle Atlantic' | 'Midwest' | 'South' | 'West';
}

interface StateRateMapProps {
  states: StateMapRecord[];
  nationalAverageRate: number;
}

export function StateRateMap({ states, nationalAverageRate }: StateRateMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const getRateTierColor = (rate: number) => {
    if (rate < 13.0) return '#16a34a'; // Low (Green)
    if (rate < 16.5) return '#0d9488'; // Below Avg (Teal)
    if (rate < 20.0) return '#2563eb'; // Moderate (Blue)
    if (rate < 26.0) return '#d97706'; // High (Amber)
    return '#dc2626'; // Very High (Red)
  };

  const getRateTierBg = (rate: number) => {
    if (rate < 13.0) return '#f0fdf4';
    if (rate < 16.5) return '#f0fdfa';
    if (rate < 20.0) return '#eff6ff';
    if (rate < 26.0) return '#fffbeb';
    return '#fef2f2';
  };

  const filteredStates = useMemo(() => {
    return states.filter((st) => {
      if (selectedRegion !== 'all' && st.region !== selectedRegion) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return st.name.toLowerCase().includes(q) || st.code.toLowerCase().includes(q);
      }
      return true;
    });
  }, [states, selectedRegion, searchQuery]);

  return (
    <div className={styles.mapWrapper} aria-label="Interactive U.S. Electricity Rate Map">
      {/* Legend Bar */}
      <div className={styles.legendBar}>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Rate Tiers (¢/kWh):</span>
        <div className={styles.legendItem}>
          <span className={styles.legendColorBox} style={{ background: '#16a34a' }} />
          <span>&lt; 13.0¢ (Lowest)</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendColorBox} style={{ background: '#0d9488' }} />
          <span>13.0¢ – 16.4¢ (Below Avg)</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendColorBox} style={{ background: '#2563eb' }} />
          <span>16.5¢ – 19.9¢ (Moderate)</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendColorBox} style={{ background: '#d97706' }} />
          <span>20.0¢ – 25.9¢ (Above Avg)</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendColorBox} style={{ background: '#dc2626' }} />
          <span>26.0¢+ (Highest)</span>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 13, color: '#475569' }}>
          U.S. National Baseline: <strong>{nationalAverageRate.toFixed(2)}¢/kWh</strong>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className={styles.filterBar}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, flex: 1 }}>
          <Button
            type={selectedRegion === 'all' ? 'primary' : 'default'}
            onClick={() => setSelectedRegion('all')}
            style={
              selectedRegion === 'all' ? { background: '#176b5b', borderColor: '#176b5b' } : {}
            }
          >
            All 50 States ({states.length})
          </Button>
          <Button
            type={selectedRegion === 'New England' ? 'primary' : 'default'}
            onClick={() => setSelectedRegion('New England')}
            style={
              selectedRegion === 'New England'
                ? { background: '#176b5b', borderColor: '#176b5b' }
                : {}
            }
          >
            New England
          </Button>
          <Button
            type={selectedRegion === 'Middle Atlantic' ? 'primary' : 'default'}
            onClick={() => setSelectedRegion('Middle Atlantic')}
            style={
              selectedRegion === 'Middle Atlantic'
                ? { background: '#176b5b', borderColor: '#176b5b' }
                : {}
            }
          >
            Mid-Atlantic
          </Button>
          <Button
            type={selectedRegion === 'Midwest' ? 'primary' : 'default'}
            onClick={() => setSelectedRegion('Midwest')}
            style={
              selectedRegion === 'Midwest' ? { background: '#176b5b', borderColor: '#176b5b' } : {}
            }
          >
            Midwest
          </Button>
          <Button
            type={selectedRegion === 'South' ? 'primary' : 'default'}
            onClick={() => setSelectedRegion('South')}
            style={
              selectedRegion === 'South' ? { background: '#176b5b', borderColor: '#176b5b' } : {}
            }
          >
            South
          </Button>
          <Button
            type={selectedRegion === 'West' ? 'primary' : 'default'}
            onClick={() => setSelectedRegion('West')}
            style={
              selectedRegion === 'West' ? { background: '#176b5b', borderColor: '#176b5b' } : {}
            }
          >
            West & Pacific
          </Button>
        </div>

        <Input
          placeholder="Filter state by name or code..."
          prefix={<SearchOutlined style={{ color: '#94a3b8' }} />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: 240 }}
          allowClear
        />
      </div>

      {/* State Interactive Cards Grid */}
      <div className={styles.stateGrid}>
        {filteredStates.map((st) => {
          const color = getRateTierColor(st.rateCentsPerKwh);
          const bg = getRateTierBg(st.rateCentsPerKwh);
          const typicalMonthlyBill = Math.round(st.rateCentsPerKwh * 8.84); // 884 kWh average

          return (
            <Link
              key={st.code}
              href={`/electricity-rates/${st.slug}` as PublicRouteHref}
              className={styles.stateCard}
              style={{ backgroundColor: bg }}
            >
              <div className={styles.stateCardTop}>
                <span className={styles.stateCode}>{st.code}</span>
                <Tag color={st.rateCentsPerKwh < nationalAverageRate ? 'green' : 'orange'}>
                  {st.region}
                </Tag>
              </div>

              <div className={styles.stateName}>{st.name}</div>
              <div className={styles.stateRate} style={{ color }}>
                {st.rateCentsPerKwh.toFixed(1)}¢
                <span style={{ fontSize: 12, fontWeight: 500, color: '#64748b' }}>/kWh</span>
              </div>
              <div className={styles.stateBill}>Avg Bill: ~${typicalMonthlyBill}/mo</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
