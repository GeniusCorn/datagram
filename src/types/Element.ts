export type ChartName =
  | 'LineChart'
  | 'MultipleLineChart'
  | 'AreaChart'
  | 'ColumnChart'
  | 'GroupedColumnChart'
  | 'StackedColumnChart'
  | 'WaterFallChart'
  | 'BarChart'
  | 'PieChart'
  | 'RoseChart'
  | 'RadarChart'
  | 'ScatterChart'
  | 'FunnelChart'

export type OthersName = 'TextCpt' | 'PicCpt'

export type CptName = ChartName | OthersName

export type ChartDataName = 'CoordinateData' | 'MappingData'

export type ChartConfigName =
  | 'LineConfig'
  | 'AreaConfig'
  | 'ColumnConfig'
  | 'WaterFallConfig'
  | 'PieConfig'
  | 'RadarConfig'
  | 'ScatterConfig'
  | 'FunnelConfig'

export type OthersConfigName = 'TextConfig' | 'PicConfig'

export type CptConfigName = ChartConfigName | OthersConfigName
